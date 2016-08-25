package com.ancs.cms.utils.zhihu.compents;

import java.util.Date;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.ancs.cms.models.CmsContent;
import com.ancs.cms.models.CmsContentAttribute;
import com.ancs.cms.services.CmsContentAttributeRepository;
import com.ancs.cms.services.CmsContentRepository;
import com.ancs.cms.utils.zhihu.model.Detail;
import com.ancs.cms.utils.zhihu.model.Root;
import com.ancs.cms.utils.zhihu.model.Stories;

@Component
public class SyncFromZhihu {

	final static String LAST = "http://news.at.zhihu.com/api/4/news/before/";
	final static String DETAIL = "http://news-at.zhihu.com/api/4/news/";
	@Autowired
	private CmsContentRepository cmsService;
	@Autowired
	private CmsContentAttributeRepository attributeService;

	public void syncToday() {
		Date date = new Date();
		String dateStr = DateFormatUtils.format(date, "yyyyMMdd");
		getListAndStories(dateStr);
	}

	public void sync() {
		Date date = new Date();
		for (int i = 0; i < 1000; i++) {
			date = DateUtils.addDays(date, -1);
			String dateStr = DateFormatUtils.format(date, "yyyyMMdd");

			getListAndStories(dateStr);
			try {
				Thread.sleep(1000);
			} catch (Exception e) {

			}
		}
	}

	@Transactional
	private void getListAndStories(String day) {
		String url = LAST + day;
		Root root = getFromZhihu(url, Root.class);
		if (null != root && null != root.getStories() && root.getStories().size() > 0) {
			for (Stories st : root.getStories()) {
				CmsContent content = new CmsContent();
				content.setTitle(st.getTitle());
				System.out.println(st.getTitle());
				if (null != st.getImages() && st.getImages().size() > 0) {
					content.setCover(st.getImages().get(0));
				}
				content.update();
				try {
					
					content.setCreateDate(DateUtils.parseDate(day, "yyyyMMdd"));
				} catch (Exception e) {
					content.setCreateDate(new Date());
				}
				try {
					System.out.println(content.getTitle());
					
					CmsContent saved = cmsService.save(content);
					Detail detail = getFromZhihu(DETAIL + st.getId(), Detail.class);
					
					CmsContentAttribute ca = new CmsContentAttribute();
					ca.setContentId(saved.getId());
					ca.setText(detail.getBody());
					System.out.println(ca.getText());
					ca.setWordCount(detail.getBody().length());

					attributeService.save(ca);
				} catch (Exception e) {
					e.printStackTrace();
				}

			}
		}
	}

	private <T> T getFromZhihu(String url, Class<T> c) {
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForObject(url, c);
	}

	public static void main(String args[]) {
		Date date = new Date();
		String dateStr = DateFormatUtils.format(date, "yyyyMMdd");
		System.out.println(dateStr);
	}
}
