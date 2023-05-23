export default function authHeader() {
    // const user = JSON.parse(localStorage.getItem('user'))
    const user = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJuMUF3b0h3SFNVMjdScWJwb3l2SWdFWTg3WHJxa3FrYVhJZTBQZGVyRTJJIn0.eyJleHAiOjE2ODQ4NzI1MzYsImlhdCI6MTY4NDg2ODkzNiwianRpIjoiMzc4MjZlNzgtMTgzMC00YTVhLWFkMWMtMjM4M2IzOGExODJlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOlsiQWJkLXJlYWxtIiwiYWNjb3VudCJdLCJzdWIiOiJhYmMxOWRmNy03MzZlLTQwNDEtYWFiYi1lNTIxMDhkODBmMzQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJiYWNrZW5kLWNsaWVudCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiQWJkLXJlYWxtIjp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJjbGllbnRJZCI6ImJhY2tlbmQtY2xpZW50IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMTcyLjE4LjAuMSIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1iYWNrZW5kLWNsaWVudCIsImNsaWVudEFkZHJlc3MiOiIxNzIuMTguMC4xIn0.hzgwKZbyIFbFsnWnKyYnVFtAjjwyETOU049DGiGZ7T2BM5aRUj3rtuqGnXB69ULDMXHfXFCfY0VGEVSRPh1KMmS50RtveOdO8j4rOQiv5JZwhdq8WPxks2puWbYTX-7ZxPHjgPlAM3gwbeSRXC2ZeN2AL9Jpe9twc03SewZ3xMnmBtWOGtVAyJD0UhU-RhbM5XEd2IaBAi4RE1VcqVbNeytWZY-qCACkVaiPEKhCN4S-8BAjI0Zb36jydrUGffjHjSOXJQkhDQTHZt7SpoQQmDlovsdi1SiixloE5OLUN9Ma3saa-lAsZKpbUTKBT0tWk8iqYxHN7QRY4P6Jhm5EsQ"
    if (user) {
      return { 'x-api-key': 'AZ87-6563-XUJH-00000', Authorization: 'Bearer ' + user }
    } else {
      return {}
    }
  }
  

