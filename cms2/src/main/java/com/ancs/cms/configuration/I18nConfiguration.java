package com.ancs.cms.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class I18nConfiguration {
     @Bean
      public ResourceBundleMessageSource messageSource(){
            ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
            messageSource.setUseCodeAsDefaultMessage(true);
            messageSource.setFallbackToSystemLocale(false);
            messageSource.setBasenames("default");
            messageSource.setDefaultEncoding("UTF-8");
            messageSource.setCacheSeconds(2);
            return messageSource;

     }
}   