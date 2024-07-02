package kataPP315.controller;

import kataPP315.model.User;
import kataPP315.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;


@Controller
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @GetMapping(value = "/userInfo")
    public String showUserInfo(ModelMap modelMap, Principal principal) {
        User user = userRepository.findUserByUsername(principal.getName());
        modelMap.addAttribute("user", user);

        return "userInfo";
    }
}
