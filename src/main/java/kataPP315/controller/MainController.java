package kataPP315.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/index")
public class MainController {

    @GetMapping(value = "")
    public String showMainPage() {
        return "index";
    }
}
