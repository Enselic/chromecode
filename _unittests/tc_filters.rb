require_relative "../_plugins/filters"
require "test/unit"

class TestSetOfSkillsFilters < Test::Unit::TestCase

	def test_add_noscript_for_lazyload_img()
		input = "should not be changed"
		result = SetOfSkillsFilters.add_noscript_for_lazyload_img(input)
		assert_equal(input, result)
	end
end
