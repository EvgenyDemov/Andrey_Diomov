
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse response) throws ServletException, IOException {

		 response.setContentType("text/html");
	        PrintWriter writer = response.getWriter();
	        try {
	            writer.println("<h2>Hello from HelloServlet</h2>");
	        } finally {
	            writer.close();  
	        }
	}	
}
