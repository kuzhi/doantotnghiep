package fpoly.chickens.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Order")
public class Order implements Serializable{

	@Id
	@Column(name = "Id")
	private String Id;
	
	@Column(name = "Ordercode")
	private String Ordercode;

	@ManyToOne
	@JoinColumn(name="Userid")
	User user;
	
	@Column(name = "Status")
	private Integer Status;
	
	@Column(name = "Fullname")
	private String Fullname;
	
	@Column(name = "Address")
	private String Address;
	
	@Column(name = "Phone")
	private String Phone;
	
	@Column(name = "Totalmoney")
	private Integer TotalMoney;
	
	@ManyToOne
	@JoinColumn(name="Paymenttypeid")
	PaymentType paymentType;
	
	@ManyToOne
	@JoinColumn(name="Shippingtypeid")
	ShippingType shippingType;
	
	
	@Column(name = "Create_at")
	private Date Create_at;
	
	@Column(name = "Update_at")
	private Date Update_at;
	
	@Column(name = "Deleted")
	private Boolean Deleted;

	@JsonIgnore
	@ToString.Exclude
	@OneToMany(mappedBy = "order")
	List<OrderDetail> orderDetail;
	
}
