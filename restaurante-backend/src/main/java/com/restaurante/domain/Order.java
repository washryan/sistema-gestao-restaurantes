package com.restaurante.domain;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToMany
  private List<MenuItem> items;

  private LocalDateTime orderTime;
  private String status;
  private BigDecimal totalAmount;

  public void setOrderTime(LocalDateTime orderTime) {
    this.orderTime = orderTime;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Long getId() {
    return this.id;
  }

  public List<MenuItem> getItems() {
    return this.items;
  }

  public void setItems(List<MenuItem> items) {
    this.items = items;
  }
}
