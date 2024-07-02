package kataPP315.service;

import kataPP315.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    List<User> findAll();
    Optional<User> getById(Long id);
    User findUserByUsername(String username);
    boolean save(User user);

    void deleteById(Long id);

    void update(User user);

    @Override
    UserDetails loadUserByUsername(String s) throws UsernameNotFoundException;
}