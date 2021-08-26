package com.example.dongho.service;

import org.springframework.stereotype.Service;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.CacheStats;
import com.google.common.cache.LoadingCache;
import com.google.common.collect.ImmutableMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class LoginServices {
    private LoadingCache<String, Integer> cache;

    public Boolean blockIP(String ip) throws ExecutionException {
        if(cache.get(ip) >= 5){
            return true;
        }
        else{
            return false;
        }
    }
    public void remove(String ip){
        cache.invalidate(ip);
    }

    public void loginFailed(String key) throws ExecutionException {
        int attempts = 0;
        if(cache.size() == 0){
            cache.put(key, attempts);
        }
        attempts = cache.get(key);
        attempts++;
        cache.put(key, attempts);
    }

    public LoginServices() {
        cache = CacheBuilder.newBuilder().
                expireAfterWrite(1, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {
            public Integer load(String key) {
                return 0;
            }
        });
    }
}
