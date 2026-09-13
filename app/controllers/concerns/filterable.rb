module Filterable
  extend ActiveSupport::Concern

  FilterResult = Data.define(:records, :filter_values)

  private

  def filter_relation(relation, allowed_filters, defaults: {})
    active_filters = {}
    filtered_relation = relation

    allowed_filters.each do |param_name, options|
      param_value = params[param_name].presence || defaults[param_name]

      next if param_value.blank?

      if options.is_a?(Array)
        # Dropdown/Select: value must be in predefined list
        if options.include?(param_value)
          filtered_relation = filtered_relation.where(param_name => param_value)
          active_filters[param_name] = param_value
        end
      elsif options.is_a?(Proc)
        # Lambda block for dynamic scoping (requires passing/evaluating on filtered_relation)
        filtered_relation = filtered_relation.instance_exec(param_value, &options)
        active_filters[param_name] = param_value
      end
    end

    FilterResult.new(records: filtered_relation, filter_values: active_filters)
  end
end
