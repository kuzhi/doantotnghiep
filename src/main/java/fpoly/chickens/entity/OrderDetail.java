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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "OrderDetail")
public class OrderDetail {
	
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;
	

	@ManyToOne
	@JoinColumn(name="Productid")
	Product product;
	
	@ManyToOne
	@JoinColumn(name="Orderid")
	Order order;
	
	@Column(name = "Quanlity")
	private Integer Quanlity;
	
	@Column(name = "Total")
	private Integer Total;
	
	@Column(name = "Create_at")
	private Date Create_at;
	
	@Column(name = "Update_at")
	private Date Update_at;
}
