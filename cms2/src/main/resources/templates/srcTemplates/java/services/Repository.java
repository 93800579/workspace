package [[${packageName}]].[[${dest}]];
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import [[${modelPath}]];

public interface [[${className}]]Repository extends JpaRepository<[[${className}]],Integer>{

}
