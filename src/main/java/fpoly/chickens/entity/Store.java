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
@Table(name = "Store")
public class Store {
	
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;
	
	@Column(name = "Name")	
	private String Name;
	
	@ManyToOne
	@JoinColumn(name = "Userstoreid")
	UserStore UserstoreId;
	
	@Column(name = "Address")
	private String Address;	
	
	@Column(name = "Phone")
	private String Phone;
	
	@Column(name = "Enddate")
	private Date Enddate;	
	
	@Column(name = "Image")
	private String Image;
	
	@Column(name = "Create_at")
	private Date Create_at;
	
	@Column(name = "Update_at")
	private Date Update_at;
	
	@Column(name = "Deleted")
	private Boolean Deleted;

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public UserStore getUserstoreId() {
		return UserstoreId;
	}

	public void setUserstoreId(UserStore userstoreId) {
		UserstoreId = userstoreId;
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

	public Date getEnddate() {
		return Enddate;
	}

	public void setEnddate(Date enddate) {
		Enddate = enddate;
	}

	public String getImage() {
		return Image;
	}

	public void setImage(String image) {
		Image = image;
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
