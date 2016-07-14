using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace Starry.Lib.Impl.util
{
    public class PasswordHashing
    {
        public string GenerateHashedPassword(string password)
        {
            // Create salt value with PRNG
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);
            // Get hash value
            var pdkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pdkdf2.GetBytes(20);
            // Combine salt and password bytes
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string savedPasswordHash = Convert.ToBase64String(hashBytes);
            return savedPasswordHash;
        }

        /// <summary>
        /// Returns true if password is correct
        /// </summary>
        /// <param name="password"></param>
        /// <param name="hashedPassword"></param>
        /// <returns></returns>
        public bool ComparePassword(string password, string hashedPassword)
        {
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);
            // Get the salt
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            // Compute hash on password
            var pdkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pdkdf2.GetBytes(20);
            // Compare results
            for(int i=0; i<20; i++)
            {
                if(hashBytes[i+16] != hash[i])
                {
                    return false;
                }
            }

            return true;
        }

        public string GenerateEmailVerificationCode()
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 8)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
