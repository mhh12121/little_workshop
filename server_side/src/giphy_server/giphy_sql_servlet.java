package giphy_server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.annotation.Resource;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import javax.ws.rs.core.MediaType;

@SuppressWarnings("serial")
@WebServlet(urlPatterns="/giphylist/search")
public class giphy_sql_servlet extends HttpServlet{
	@Resource(lookup="jdbc/giphy_list")
	private DataSource coonpool;
	
	@Override
	protected void doPost(HttpServletRequest req,HttpServletResponse res) throws ServletException,IOException{
		StringBuilder buffer = new StringBuilder();
	    BufferedReader reader = req.getReader();
	    String line;
	    while ((line = reader.readLine()) != null) {
	        buffer.append(line);
	    }
	    String data = buffer.toString();
	    JsonObject body = Json.createReader(new StringReader(data)).readObject();
	    String title = body.getString("title");
	    String user = body.getString("user");
	    JsonArrayBuilder custBuilder = Json.createArrayBuilder();
	    Connection connection=null;
		try{
			connection  = coonpool.getConnection();
			String query = "select * from gl_data where title LIKE ? and user = ?";//only search by title
			 PreparedStatement preparedStmt = connection.prepareStatement(query);
			 preparedStmt.setString(1,"%"+ title + "%");
			 preparedStmt.setString(2, user);
			 ResultSet rSet = preparedStmt.executeQuery();
//			Statement stmt = connection.createStatement();
//			ResultSet rSet = stmt.executeQuery("select * from gl_data where title="+title);
//			
			while(rSet.next()) {//must need rSet.next(),or it will occur before resultset error
				JsonObject cust = Json.createObjectBuilder()
						.add("id", rSet.getString("id"))
						.add("title", rSet.getString("title"))
						.add("type", rSet.getString("type"))
						.add("url", rSet.getString("url"))
						.add("rating", rSet.getString("rating"))
						.build();
				custBuilder.add(cust);
				
			}		

			
		}
		catch(SQLException e) {
			e.printStackTrace();
			log(e.getMessage());
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}
		finally {
			 if (connection != null)
				try {
					connection.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		try(PrintWriter pWriter = res.getWriter()){
			res.setStatus(HttpServletResponse.SC_OK);
			res.setContentType(MediaType.APPLICATION_JSON);
			pWriter.println(custBuilder.build().toString());
			
		}
		
	}
	
}
