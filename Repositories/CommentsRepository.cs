using Microsoft.Data.SqlClient;
using T_I_yo_blog.Models;
using T_I_yo_blog.Utils;

namespace T_I_yo_blog.Repositories
{
    public class CommentsRepository : BaseRepository, ICommentsRepository
    {
        public  CommentsRepository(IConfiguration config) : base(config) { }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            var comment = new Comment
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                CountryId = reader.GetInt32(reader.GetOrdinal("CountryId")),
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                Subject = reader.GetString(reader.GetOrdinal("Subject")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime"))
            };

            return comment;
        }
        public List<Comment> GetAllCommentsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.CountryId, c.UserId, c.Subject, c.Content, c.CreateDateTime
                        FROM Comments c
                       ORDER BY c.CreateDateTime DESC";

                    cmd.Parameters.AddWithValue("@Id", userId);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader));
                    }

                    reader.Close();

                    return comments;
                }
            }
        } 
        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Comments (Id, CountryId, UserId, Subject, Content, CreateDateTime)
                                         OUTPUT INSERTED.ID
                                         VALUES (@Id, @CountryId, @UserId, @Subject, @Content, @CreateDateTime)";
                    DbUtils.AddParameter(cmd, "@Id", comment.Id);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", comment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@CountryId", comment.CountryId);
                    DbUtils.AddParameter(cmd, "@UserId", comment.UserId);
                    DbUtils.AddParameter(cmd, "@Subject", comment.Subject);
                    DbUtils.AddParameter(cmd, "@Content", comment.Content);
                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Comments " +
                                      "WHERE Id = @CommentId";
                    DbUtils.AddParameter(cmd, "@CommentId", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  UPDATE Comments
                  SET CountryId = @countryId, UserId = @userId, Subject = @subject, Content = @content, CreateDateTime = @createDateTime
                  WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", comment.Id);
                    cmd.Parameters.AddWithValue("@countryId", comment.CountryId);
                    cmd.Parameters.AddWithValue("@userId", comment.UserId);
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@createDateTime", comment.CreateDateTime);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
