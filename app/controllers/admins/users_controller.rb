class Admins::UsersController < Admins::BaseController
  def index
    render inertia: "Admins/Users", props: {}
  end
end
