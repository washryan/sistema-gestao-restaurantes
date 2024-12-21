package com.restaurante.infrastructure.persistence;

import com.restaurante.domain.MenuItemRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaMenuItemRepository extends MenuItemRepository {
  // Métodos personalizados podem ser adicionados aqui, se necessário
}
