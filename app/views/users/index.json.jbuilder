json.array! @users do |user|
  json.id user.id
  json.name user.name
  # json.email user.mail
  # json.encypted_password user.encypted_password
end
