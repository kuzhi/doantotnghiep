package fpoly.chickens.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Pack")
public class Pack {

	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;

	@Column(name = "Name")
	private String Name;
	
	@Column(name = "Image")
	private String Image;
	
	@Column(name = "Price")
	private Integer Price;

	@Column(name = "Date")
	private Integer Date;

	@Column(name = "Create_at")
	private Date Create_at;

	@Column(name = "Update_at")
	private Date Update_at;

	

}
