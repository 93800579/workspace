package com.ancs.config;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;

import com.ancs.cloudFiles.models.SysUser;
import com.ancs.cloudFiles.services.SysUserRepository;

public class MyShiroRealm extends AuthorizingRealm {

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
		// TODO Auto-generated method stub
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		Subject currentUser = SecurityUtils.getSubject(); 
        Session session = currentUser.getSession();
        SysUser user = (SysUser) session.getAttribute("currentUser");
        if(user.isSuperuserAccess())
        	authorizationInfo.addRole("admin");
		return authorizationInfo;
	}
	public MyShiroRealm() {
		setName("MyShiroRealm");
		// 采用MD5加密
		setCredentialsMatcher(new HashedCredentialsMatcher("md5"));
	}
	@Autowired
	private SysUserRepository repository;
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
		// TODO Auto-generated method stub
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;    
     
        SysUser user = repository.getSysUserByName(token.getUsername());    
        if (user != null) {  
        	addSession(user);
            return new SimpleAuthenticationInfo(user.getName(),                     
                    user.getPassword(), getName());  
            
        }    
        return null;    
	}
	private void addSession(SysUser user){
		Subject currentUser = SecurityUtils.getSubject(); 
        Session session = currentUser.getSession();
        session.setAttribute("currentUser",user);
	}

}
