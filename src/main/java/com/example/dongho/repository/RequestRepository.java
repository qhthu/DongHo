package com.example.dongho.repository;

import javax.servlet.http.HttpServletRequest;

public interface RequestRepository {

    String getClientIp(HttpServletRequest request);
}
