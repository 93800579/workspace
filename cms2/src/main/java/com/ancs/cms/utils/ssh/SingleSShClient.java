package com.ancs.cms.utils.ssh;

import java.io.IOException;
import java.net.InetAddress;

import net.schmizz.sshj.SSHClient;

public class SingleSShClient {
	private static SSHClient client;

	private SingleSShClient() {

	}

	public static SSHClient getSingleByUrlAndName(String url, String username) throws Exception {
		InetAddress address = InetAddress.getByName(url);
		if (null != client && client.isConnected() && (!client.getRemoteAddress().equals(address))) {
			client.close();
			init(url, username);
		} else {
			init(url, username);
		}
		return client;
	}

	private static void init(String url, String username) throws Exception {
		client = new SSHClient();
		client.loadKnownHosts();
		client.connect(url);
		client.authPublickey(username);
	}

	public static void close() {
		if(null!=client)
			try {
				client.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		client = null;
	}

}
