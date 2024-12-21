package com.restaurante.interfaces;

import com.restaurante.application.MenuService;
import com.restaurante.domain.MenuItem;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@Tag(name = "Menu", description = "API para gerenciamento do menu")
public class MenuController {
  private final MenuService menuService;

  @Autowired
  public MenuController(MenuService menuService) {
    this.menuService = menuService;
  }

  @GetMapping
  @Operation(summary = "Listar todos os itens do menu", description = "Retorna uma lista de todos os itens disponíveis no menu")
  public List<MenuItem> getAllMenuItems() {
    return menuService.getAllMenuItems();
  }

  @PostMapping
  @Operation(summary = "Adicionar um novo item ao menu", description = "Adiciona um novo item ao menu e retorna o item criado")
  public MenuItem addMenuItem(@RequestBody MenuItem menuItem) {
    return menuService.addMenuItem(menuItem);
  }
}