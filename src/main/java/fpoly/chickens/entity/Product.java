package fpoly.chickens.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Product")
public class Product implements Serializable {
	
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;
	
	@Column(name = "Name")
	private String Name;
	
	@ManyToOne
	@JoinColumn(name="Categoryid")
	Category category;
	
	@Column(name = "Price")
	private Integer Price;
	
	@Column(name = "Description")
	private String Description;
	
	@Column(name = "Image")
	private String Image;
	
	@Column(name = "Deleted")
	private Boolean Deleted;
	
	@Column(name = "Create_at")
	private Date Create_at;
	
	@Column(name = "Update_at")
	private Date Update_at;

	@JsonIgnore
	@ToString.Exclude
	@OneToMany(mappedBy = "product")
	List<OrderDetail> orderDetail;
	
}
