package com.restaurante.interfaces;

import com.restaurante.application.MenuService;
import com.restaurante.domain.MenuItem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MenuController.class)
class MenuControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private MenuService menuService;

  @Test
  void getAllMenuItems_shouldReturnAllItems() throws Exception {
    MenuItem item1 = new MenuItem("Pizza", new BigDecimal("10.99"));
    MenuItem item2 = new MenuItem("Burger", new BigDecimal("8.99"));

    List<MenuItem> menuItems = Arrays.asList(item1, item2);
    when(menuService.getAllMenuItems()).thenReturn(menuItems);

    mockMvc.perform(get("/api/menu"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$[0].name").value("Pizza"))
        .andExpect(jsonPath("$[0].price").value(10.99))
        .andExpect(jsonPath("$[1].name").value("Burger"))
        .andExpect(jsonPath("$[1].price").value(8.99));

    verify(menuService, times(1)).getAllMenuItems();
  }

  @Test
  void addMenuItem_shouldAddAndReturnItem() throws Exception {
    MenuItem item = new MenuItem("Salad", new BigDecimal("6.99"));
    when(menuService.addMenuItem(any(MenuItem.class))).thenReturn(item);

    mockMvc.perform(post("/api/menu")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\"name\":\"Salad\",\"price\":6.99}"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.name").value("Salad"))
        .andExpect(jsonPath("$.price").value(6.99));

    verify(menuService, times(1)).addMenuItem(any(MenuItem.class));
  }
}
