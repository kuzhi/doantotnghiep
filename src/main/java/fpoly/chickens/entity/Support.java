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

import lombok.Data;

@Entity
@Data
@Table(name = "Support")
public class Support {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    
   
	@ManyToOne
	@JoinColumn(name="Userstoreid")
	UserStore userStore;

    @ManyToOne
	@JoinColumn(name="Userappid")
	UserApp userApp;

    @Column(name = "Status")
	private Boolean status;	

	@Column(name = "Notes")
	private String notes;	

    @Column(name = "Create_at")
	@CreationTimestamp
	private Date Create_at;
	
	@Column(name = "Update_at")
	@UpdateTimestamp
	private Date Update_at;
}
