package com.restaurante.interfaces;

import com.restaurante.application.MenuService;
import com.restaurante.domain.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

  private final MenuService menuService;

  @Autowired
  public MenuController(MenuService menuService) {
    this.menuService = menuService;
  }

  @GetMapping
  public ResponseEntity<List<MenuItem>> getAllMenuItems() {
    return ResponseEntity.ok(menuService.getAllMenuItems());
  }

  @PostMapping
  public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem menuItem) {
    return ResponseEntity.ok(menuService.addMenuItem(menuItem));
  }
}
