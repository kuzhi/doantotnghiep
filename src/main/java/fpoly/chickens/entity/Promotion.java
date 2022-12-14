package fpoly.chickens.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Promotion")
public class Promotion {

	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;

	@Column(name = "Name")
	private String Name;

	@ManyToOne
	@JoinColumn(name="Storeid")
	Store store;
	
	@Column(name = "Discount")
	private Double Discount;

	@Column(name = "Startdate")
	private Date StartDate;

	@Column(name = "Enddate")
	private Date EndDate;

	@Column(name = "Create_at")
	private Date Create_at;

	@Column(name = "Update_at")
	private Date Update_at;

	
}
