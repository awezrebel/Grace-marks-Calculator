import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
   public class login
   {
       public static void main (String[] args)
       {
           System.out.println("\n\n***** MySQL JDBC Connection Testing *****");
		   Connection conn = null;
           try
           {
		   Class.forName ("com.MySQL.jdbc.Driver").newInstance ();
               String userName = "root";
               String password = "Awez@0987";
               String url = "jdbc:MySQL://localhost/database1";        
               conn = DriverManager.getConnection (url, userName, password);
               System.out.println ("\nDatabase Connection Established...");
           }
          catch (Exception ex)
           {
		       System.err.println ("Cannot connect to database server");
			   ex.printStackTrace();
           }      
		   
		   finally
           {
               if (conn != null)
               {
                   try
                   {
                       System.out.println("\n***** Let terminate the Connection *****");
					   conn.close ();					   
                       System.out.println ("\nDatabase connection terminated...");
                   }
                   catch (Exception ex)
				   {
				   System.out.println ("Error in connection termination!");
				   }
               }
           }
       }
   }
 