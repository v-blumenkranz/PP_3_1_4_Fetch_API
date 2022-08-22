package ru.kata.spring.boot_security.demo.rest;

import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.services.RoleService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/roles")
public class RolesRestController {

    private RoleService roleService;

    public RolesRestController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    @ResponseBody
    public List<Role> listRoles() {
        return roleService.getAllRolesFromDatabase();
    }
}
