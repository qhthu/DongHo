package com.example.dongho.entity;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data
@Table(name = "USERS")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;
    @Nullable
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Nullable
    @Column(name = "LAST_NAME")
    private String lastName;
    @Nullable
    @Column(name = "PHONE")
    private String phone;
    @Nullable
    @Column(name = "DOB")
    private Date dob;
    @Nullable
    @Column(name = "GENDER_ID")
    private Integer gender;
    @Nullable
    @Column(name = "EMAIL")
    private String email;
    @Nullable
    @Column(name = "USERNAME")
    private String username;
    @Nullable
    @Column(name = "PASSWORD")
    private String password;
    @Nullable
    @Column(name = "STATUS_ID")
    private Integer status;
    @Nullable
    @Column(name = "ROLE_ID")
    private String roleId;
    @Nullable
    @Column(name = "ADDRESS_ID")
    private Integer addressId;
    @Nullable
    @Column(name = "CREATE_AT")
    private Date create_at;
    @Nullable
    @Column(name = "UPDATE_AT")
    private Date update_at;

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Nullable
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(@Nullable String firstName) {
        this.firstName = firstName;
    }

    @Nullable
    public String getLastName() {
        return lastName;
    }

    public void setLastName(@Nullable String lastName) {
        this.lastName = lastName;
    }

    @Nullable
    public String getPhone() {
        return phone;
    }

    public void setPhone(@Nullable String phone) {
        this.phone = phone;
    }

    @Nullable
    public Date getDob() {
        return dob;
    }

    public void setDob(@Nullable Date dob) {
        this.dob = dob;
    }

    @Nullable
    public Integer getGender() {
        return gender;
    }

    public void setGender(@Nullable Integer gender) {
        this.gender = gender;
    }

    @Nullable
    public String getEmail() {
        return email;
    }

    public void setEmail(@Nullable String email) {
        this.email = email;
    }

    @Nullable
    public String getUsername() {
        return username;
    }

    public void setUsername(@Nullable String username) {
        this.username = username;
    }

    @Nullable
    public String getPassword() {
        return password;
    }

    public void setPassword(@Nullable String password) {
        this.password = password;
    }

    @Nullable
    public Integer getStatus() {
        return status;
    }

    public void setStatus(@Nullable Integer status) {
        this.status = status;
    }

    @Nullable
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(@Nullable String roleId) {
        this.roleId = roleId;
    }

    @Nullable
    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(@Nullable Integer addressId) {
        this.addressId = addressId;
    }

    @Nullable
    public Date getCreate_at() {
        return create_at;
    }

    public void setCreate_at(@Nullable Date create_at) {
        this.create_at = create_at;
    }

    @Nullable
    public Date getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(@Nullable Date update_at) {
        this.update_at = update_at;
    }
}
