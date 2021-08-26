package com.example.dongho.service;

//import com.example.dongho.UserDetail;
import com.example.dongho.entity.Role;
import com.example.dongho.entity.User;
import com.example.dongho.repository.RoleRepository;
import com.example.dongho.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;
    public List<User> getListUser(){
        return userRepository.findAll();
    }

    public void deleteUser(Integer id){
        Optional<User> user = userRepository.findById(id);
        user.get().setStatus(2);
        userRepository.save(user.get());
    }
    public boolean existsUser(String username){
        User user = userRepository.findUsersByUsername(username);
        if(user == null){
            return false;
        }
        return userRepository.existsById(user.getId());
    }
    public Optional<User> getUserByUsername(String username){
        User user = userRepository.findUsersByUsername(username);
        return userRepository.findById(user.getId());
    }

    public Optional<User> getUserById(Integer id){
        return userRepository.findById(id);
    }
    public void saveUser(User user){
        userRepository.save(user);
    }

    public void deleteUser(String username){
        User user = userRepository.findUsersByUsername(username);
        userRepository.deleteById(user.getId());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUsersByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRoleId()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}
