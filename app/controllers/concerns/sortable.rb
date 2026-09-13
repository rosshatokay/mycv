module Sortable
  extend ActiveSupport::Concern

  SortResult = Data.define(:records, :sort_key)

  private

  def sort_relation(relation, allowed_sorts, param_name: :sort, default_sort: allowed_sorts.keys.first)
    sort_param = params[param_name]
    sort_key = allowed_sorts.key?(sort_param) ? sort_param : default_sort

    SortResult.new(
      records: relation.order(allowed_sorts[sort_key]),
      sort_key: sort_key,
    )
  end
end
