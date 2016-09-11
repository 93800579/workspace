package com.ancs.cms.admin.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ancs.cms.utils.ssh.HostModel;
import com.ancs.cms.utils.ssh.SingleSShClient;

import net.schmizz.sshj.SSHClient;
import net.schmizz.sshj.sftp.RemoteResourceInfo;
import net.schmizz.sshj.sftp.SFTPClient;

@Controller
@RequestMapping("/remote")
public class ReomteControllor {
	
	private static List<HostModel> hostModels;
	@GetMapping(value = "/getAll")
	public ModelAndView getAll() {
		if(null==hostModels){
			hostModels = new ArrayList<HostModel>();
			hostModels.add(new HostModel("openShift1","jbosswildfly-fenglei.rhcloud.com", "57be65cc2d5271fe4d0000a3", null,
					"/var/lib/openshift/57be65cc2d5271fe4d0000a3"));
		}
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("remote/getall");
		modelAndView.addObject("list", hostModels);
		return modelAndView;
	}

	private static SFTPClient sftpClient;
	
	@GetMapping(value="/view/{id}")
	public ModelAndView view(@PathVariable(value="id")Integer id){
		if(null==hostModels||hostModels.size()<id){
			return new ModelAndView("error");
		}
		else{
			ModelAndView view = new ModelAndView("remote/view");
			view.addObject("id", id);
			view.addObject("model",hostModels.get(id-1));
			if(null==sftpClient){
				try{
				SSHClient client = SingleSShClient.getSingleByUrlAndName(hostModels.get(id-1).getHostName()
						, hostModels.get(id-1).getUserName());
				sftpClient = client.newSFTPClient();
				}
				catch(Exception e){
					return new ModelAndView("error");
				}
			}
			return view;
			
		}
	}
	
	private List<RemoteResourceInfo> link;
	@GetMapping(value = "/list")
	@ResponseBody
	public List<RemoteResourceInfo> getFileList(@RequestParam(value = "path") String path) throws IOException {
		if(null==link)
			link = new LinkedList<RemoteResourceInfo>();
		try {
			List<RemoteResourceInfo> list = sftpClient.ls("/var/lib/openshift/57be65cc2d5271fe4d0000a3");
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
		}
	}

}
