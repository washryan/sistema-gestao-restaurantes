package com.restaurante.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query("SELECT COUNT(o), SUM(o.totalAmount), AVG(o.totalAmount) FROM Order o WHERE o.orderTime BETWEEN ?1 AND ?2")
  List<Object[]> getDailySalesData(LocalDateTime startOfDay, LocalDateTime endOfDay);

  @Query("SELECT NEW map(i.name as item, COUNT(i) as count) FROM Order o JOIN o.items i GROUP BY i.name ORDER BY COUNT(i) DESC")
  List<Map<String, Object>> getPopularItems();
}
