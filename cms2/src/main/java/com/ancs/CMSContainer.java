package com.ancs;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;  
@Configuration
@ComponentScan
@EnableAutoConfiguration
public class CMSContainer extends org.springframework.boot.web.support.SpringBootServletInitializer{
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(CMSContainer.class);
    }

}
