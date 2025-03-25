package com.example.demo.db.repository.api;

import com.example.demo.db.entity.User;
import jakarta.annotation.Nullable;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 *
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {


        /**
         *
         * @param id must not be {@literal null}.
         * @return
         */
        Optional<User> findById(@NonNull UUID id);

        /**
         *
         * @param mail
         * @return
         */
        Optional<User> findByMail(@NonNull String mail);

        /**
         *
         * @param id
         */
        void deleteAllById(@NonNull UUID id);
}