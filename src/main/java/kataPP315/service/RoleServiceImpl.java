package kataPP315.service;

import kataPP315.model.Role;
import kataPP315.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getAllUser() {
        return roleRepository.findAll();
    }

    @Override
    @Transactional
    public void save(Role role) {
        roleRepository.save(role);
    }
    @Override
    public Role showUserById(Long id) {
        return roleRepository.getById(id);
    }

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public Role findByRoleName(String roleName) {
        Role role = roleRepository.findByRoleName(roleName);
        return role;
    }

}
