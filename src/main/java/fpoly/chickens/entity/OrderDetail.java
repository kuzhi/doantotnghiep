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
	
	@Column(name = "Amount")
	private Integer Amount;
	
	@Column(name = "Totalmoney")
	private Integer TotalMoney;
	
	@Column(name = "Create_at")
	private Date Create_at;
	
	@Column(name = "Update_at")
	private Date Update_at;

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Integer getAmount() {
		return Amount;
	}

	public void setAmount(Integer amount) {
		Amount = amount;
	}

	public Integer getTotalMoney() {
		return TotalMoney;
	}

	public void setTotalMoney(Integer totalMoney) {
		TotalMoney = totalMoney;
	}

	public Date getCreate_at() {
		return Create_at;
	}

	public void setCreate_at(Date create_at) {
		Create_at = create_at;
	}

	public Date getUpdate_at() {
		return Update_at;
	}

	public void setUpdate_at(Date update_at) {
		Update_at = update_at;
	}
	
	

}
