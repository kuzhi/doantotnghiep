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
@Table(name = "Orderpack")
public class OrderPack {
	
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;
	
	@ManyToOne
	@JoinColumn(name="Storeid")
	Store store;
	
	@ManyToOne
	@JoinColumn(name="Packid")
	Pack pack;
	
	@Column(name = "Create_at")
	private Date Create_at;
	
	@Column(name = "Update_at")
	private Date Update_at;
	
	@Column(name = "Status")
	private Boolean Status;

	
	
}
