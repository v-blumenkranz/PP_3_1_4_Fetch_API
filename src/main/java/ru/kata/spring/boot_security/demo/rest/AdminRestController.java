package ru.kata.spring.boot_security.demo.rest;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.services.UserService;


import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class AdminRestController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AdminRestController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    @ResponseBody
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/auth")
    @ResponseBody
    public User getAuthenticatedUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userID = user.getId();
        return userService.getUserById(userID);
    }

    @ResponseBody
    @PostMapping
    public User addNewUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
        return user;
    }

    @PutMapping
    @ResponseBody
    public List<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return userService.findAllUsers();
    }

    @DeleteMapping("/{id}")
    public List<User> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return userService.findAllUsers();
    }
}
