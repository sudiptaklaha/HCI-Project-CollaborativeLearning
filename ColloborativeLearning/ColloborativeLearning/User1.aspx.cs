using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data;
using System.Data;

namespace ColloborativeLearning
{
    public partial class User1 : System.Web.UI.Page
    {
        MySql.Data.MySqlClient.MySqlConnection conn;
        MySql.Data.MySqlClient.MySqlCommand cmd;
        String queryStr;

        protected void Page_Load(object sender, EventArgs e)
        {
            String conString = System.Configuration.ConfigurationManager.ConnectionStrings["newconnection"].ToString();
            conn = new MySql.Data.MySqlClient.MySqlConnection(conString);
            conn.Open();
            queryStr = "select * from cs_522.shared_objects";
            cmd = new MySql.Data.MySqlClient.MySqlCommand(queryStr, conn);

            cmd.ExecuteReader();
            conn.Close();


        }
        protected void toServer(object sender, EventArgs e)
        {
            //var abc = hdn.Value;
        }
    }
}