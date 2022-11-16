package fpoly.chickens.entity;

import java.io.Serializable;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Userroleapp")
public class UserRoleApp implements Serializable {
	
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;
	
	@ManyToOne
	@JoinColumn(name = "Userappid")
	UserApp userapp;
	
	@ManyToOne
	@JoinColumn(name = "Roleappid")
	RoleApp roleapp;
	
	@Column(name = "Permission")
	private String Permission;
	
	
	@Column(name = "Create_at")
	@CreationTimestamp
	private Date Create_at;
	
	@Column(name = "Update_at")
	@UpdateTimestamp
	private Date Update_at;



}
