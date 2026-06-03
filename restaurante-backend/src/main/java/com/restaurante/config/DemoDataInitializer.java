package com.restaurante.config;

import com.restaurante.domain.InventoryItem;
import com.restaurante.domain.InventoryItemRepository;
import com.restaurante.domain.MenuItem;
import com.restaurante.domain.MenuItemRepository;
import com.restaurante.domain.Order;
import com.restaurante.domain.OrderRepository;
import com.restaurante.domain.User;
import com.restaurante.infrastructure.persistence.UserRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Profile({"dev", "prod"})
@RequiredArgsConstructor
public class DemoDataInitializer implements CommandLineRunner {

  private final UserRepository userRepository;
  private final MenuItemRepository menuItemRepository;
  private final InventoryItemRepository inventoryItemRepository;
  private final OrderRepository orderRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  @Transactional
  public void run(String... args) {
    if (userRepository.count() > 0) {
      return;
    }

    User demoUser = new User(
        "Administrador Demo",
        "admin",
        "admin@restaurante.com",
        passwordEncoder.encode("123456"));
    userRepository.save(demoUser);

    MenuItem burger = createMenuItem("Hambúrguer Artesanal", "Burger premium com queijo e molho da casa", "Lanches", "28.90");
    MenuItem fries = createMenuItem("Batata Rústica", "Batata crocante com ervas", "Acompanhamentos", "14.90");
    MenuItem soda = createMenuItem("Refrigerante 350ml", "Bebida gelada", "Bebidas", "8.00");
    MenuItem dessert = createMenuItem("Pudim da Casa", "Sobremesa clássica", "Sobremesas", "12.50");

    menuItemRepository.saveAll(List.of(burger, fries, soda, dessert));

    inventoryItemRepository.saveAll(List.of(
        createInventoryItem("Hambúrguer Artesanal", 24, "un"),
        createInventoryItem("Batata Rústica", 40, "porção"),
        createInventoryItem("Refrigerante 350ml", 60, "un"),
        createInventoryItem("Pudim da Casa", 18, "fatia")));

    Order firstOrder = createOrder(
        List.of(burger, fries),
        "PENDING",
        BigDecimal.valueOf(43.80),
        LocalDateTime.now().minusHours(2));

    Order secondOrder = createOrder(
        List.of(soda, burger),
        "PREPARING",
        BigDecimal.valueOf(36.90),
        LocalDateTime.now().minusHours(1));

    Order thirdOrder = createOrder(
        List.of(dessert, burger, soda),
        "READY",
        BigDecimal.valueOf(49.40),
        LocalDateTime.now().minusMinutes(20));

    orderRepository.saveAll(List.of(firstOrder, secondOrder, thirdOrder));
  }

  private MenuItem createMenuItem(String name, String description, String category, String price) {
    MenuItem item = new MenuItem();
    item.setName(name);
    item.setDescription(description);
    item.setCategory(category);
    item.setPrice(new BigDecimal(price));
    return item;
  }

  private InventoryItem createInventoryItem(String name, int quantity, String unit) {
    InventoryItem item = new InventoryItem();
    item.setName(name);
    item.setQuantity(quantity);
    item.setUnit(unit);
    return item;
  }

  private Order createOrder(List<MenuItem> items, String status, BigDecimal totalAmount, LocalDateTime orderTime) {
    Order order = new Order();
    order.setItems(items);
    order.setStatus(status);
    order.setOrderTime(orderTime);
    order.setTotalAmount(totalAmount);
    return order;
  }
}
