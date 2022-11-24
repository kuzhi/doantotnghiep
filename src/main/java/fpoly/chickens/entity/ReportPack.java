package fpoly.chickens.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportPack implements Serializable {/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	private String name;
	private Integer price;
	private Long total;
	private Long number;
}
