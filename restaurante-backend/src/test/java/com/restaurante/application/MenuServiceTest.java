package com.restaurante.application;

import com.restaurante.domain.MenuItem;
import com.restaurante.infrastructure.persistence.JpaMenuItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
class MenuServiceTest {

  @Mock
  private JpaMenuItemRepository menuItemRepository;

  private MenuService menuService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    menuService = new MenuService(menuItemRepository);
  }

  @Test
  void getAllMenuItems_shouldReturnAllItems() {
    // Arrange
    MenuItem item1 = new MenuItem();
    item1.setName("Pizza");
    item1.setPrice(new BigDecimal("10.99"));

    MenuItem item2 = new MenuItem();
    item2.setName("Burger");
    item2.setPrice(new BigDecimal("8.99"));

    List<MenuItem> expectedItems = Arrays.asList(item1, item2);
    when(menuItemRepository.findAll()).thenReturn(expectedItems);

    // Act
    List<MenuItem> actualItems = menuService.getAllMenuItems();

    // Assert
    assertEquals(expectedItems, actualItems);
    verify(menuItemRepository, times(1)).findAll();
  }

  @Test
  void addMenuItem_shouldSaveAndReturnItem() {
    // Arrange
    MenuItem item = new MenuItem();
    item.setName("Salad");
    item.setPrice(new BigDecimal("6.99"));

    when(menuItemRepository.save(item)).thenReturn(item);

    // Act
    MenuItem savedItem = menuService.addMenuItem(item);

    // Assert
    assertEquals(item, savedItem);
    verify(menuItemRepository, times(1)).save(item);
  }
}
