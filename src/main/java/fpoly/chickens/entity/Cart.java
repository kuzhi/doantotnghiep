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

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Cart")
public class Cart {
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;

	@ManyToOne
	@JoinColumn(name = "Userid")
	User user;

	@ManyToOne
	@JoinColumn(name = "Storeid")
	Store store;

	@ManyToOne
	@JoinColumn(name = "Productid")
	Product product;

	@Column(name = "Amount")
	private Integer Amount;

	@Column(name = "Create_at")
	private Date Create_at = new Date();

	@Column(name = "Update_at")
	private Date Update_at;

}
