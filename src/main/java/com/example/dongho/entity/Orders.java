package com.example.dongho.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "ORDERS")
public class Orders {
    @Id
    @Column(name = "ID")
    private Integer id;
    @Column(name = "TOTAL")
    private Long total;
    @Column(name = "USER_ID")
    private Integer userId;
    @Column(name = "STATUS_ID")
    private Integer status;
    @Column(name = "CREATE_AT")
    private Date create_at;
    @Column(name = "UPDATE_AT")
    private Date update_at;

    public Orders() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Date create_at) {
        this.create_at = create_at;
    }

    public Date getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(Date update_at) {
        this.update_at = update_at;
    }
}
