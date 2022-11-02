package fpoly.chickens.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "Order")
public class Order {

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

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public String getOrdercode() {
		return Ordercode;
	}

	public void setOrdercode(String ordercode) {
		Ordercode = ordercode;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getStatus() {
		return Status;
	}

	public void setStatus(Integer status) {
		Status = status;
	}

	public String getFullname() {
		return Fullname;
	}

	public void setFullname(String fullname) {
		Fullname = fullname;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public String getPhone() {
		return Phone;
	}

	public void setPhone(String phone) {
		Phone = phone;
	}

	public Integer getTotalMoney() {
		return TotalMoney;
	}

	public void setTotalMoney(Integer totalMoney) {
		TotalMoney = totalMoney;
	}

	public PaymentType getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(PaymentType paymentType) {
		this.paymentType = paymentType;
	}

	public ShippingType getShippingType() {
		return shippingType;
	}

	public void setShippingType(ShippingType shippingType) {
		this.shippingType = shippingType;
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

	public Boolean getDeleted() {
		return Deleted;
	}

	public void setDeleted(Boolean deleted) {
		Deleted = deleted;
	}
	
	

}
