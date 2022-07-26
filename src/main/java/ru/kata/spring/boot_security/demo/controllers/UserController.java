package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.CustomUserDetailsService;
import ru.kata.spring.boot_security.demo.services.UserServiceImpl;



@Controller
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userServiceImpl;

    private final CustomUserDetailsService customUserDetailsService;


    public UserController(UserServiceImpl userServiceImpl, CustomUserDetailsService customUserDetailsService) {
        this.userServiceImpl = userServiceImpl;
        this.customUserDetailsService = customUserDetailsService;
    }


    @GetMapping
    public String user(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = user.getId();
        user = userServiceImpl.getUserById(userId);
        model.addAttribute("user", user);
        return "user.html";
    }
}
