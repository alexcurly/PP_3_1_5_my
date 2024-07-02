package kataPP315.controller;

import kataPP315.model.User;
import kataPP315.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/admin/rest")
public class AdminRestController {

    private UserService userService;

@Autowired
    public void AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        Optional<User> userOpt = userService.getById(id);
        if (userOpt.isPresent()){
            userOpt.get().setPassword("");
            return userOpt.get();
        }
        return null;
    }

    @PostMapping()
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        userService.save(user);
        User createdUser = userService.findUserByUsername(user.getUsername());
        return ResponseEntity.ok(createdUser);
    }

    @PatchMapping("/{id}")
    public User updateUser(@PathVariable("id") Long id, @Valid @RequestBody User user) {
        user.setId(id);
        userService.update(user);
        Optional<User> userFromDbOpt = userService.getById(id);
        return userFromDbOpt.orElse(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable("id") Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok(id);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldError;
            if (error instanceof FieldError){
                fieldError = ((FieldError) error).getField();
            } else {
                fieldError = error.getObjectName();
            }
            String errorMessage = error.getDefaultMessage();
            errorResponse.put(fieldError, errorMessage);
        });
        return errorResponse;
    }
}
