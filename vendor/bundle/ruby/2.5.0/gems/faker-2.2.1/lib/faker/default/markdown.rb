# frozen_string_literal: true

module Faker
  class Markdown < Base
    class << self
      def headers
        "#{fetch('markdown.headers')} #{Lorem.word.capitalize}"
      end

      def emphasis
        paragraph = Faker::Lorem.paragraph(sentence_count: 3)
        words = paragraph.split(' ')
        position = rand(0..words.length - 1)
        formatting = fetch('markdown.emphasis')
        words[position] = "#{formatting}#{words[position]}#{formatting}"
        words.join(' ')
      end

      def ordered_list
        number = rand(1..10)

        result = []
        number.times do |i|
          result << "#{i}. #{Faker::Lorem.sentence(word_count: 1)} \n"
        end
        result.join('')
      end

      def unordered_list
        number = rand(1..10)

        result = []
        number.times do |_i|
          result << "* #{Faker::Lorem.sentence(word_count: 1)} \n"
        end
        result.join('')
      end

      def inline_code
        "`#{Faker::Lorem.sentence(word_count: 1)}`"
      end

      def block_code
        "```ruby\n#{Lorem.sentence(word_count: 1)}\n```"
      end

      def table
        table = []
        3.times do
          table << "#{Lorem.word} | #{Lorem.word} | #{Lorem.word}"
        end
        table.insert(1, '---- | ---- | ----')
        table.join("\n")
      end

      def random(*args)
        method_list = available_methods
        args&.each { |ex| method_list.delete_if { |meth| meth == ex.to_sym } }
        send(method_list[rand(0..method_list.length - 1)])
      end

      def sandwich(legacy_sentences = NOT_GIVEN, legacy_repeat = NOT_GIVEN, sentences: 3, repeat: 1)
        if legacy_sentences != NOT_GIVEN
          warn_with_uplevel 'Passing `sentences` with the 1st argument of `Markdown.sandwich` is deprecated. Use keyword argument like `Markdown.sandwich(sentences: ...)` instead.', uplevel: 1
          sentences = legacy_sentences
        end
        if legacy_repeat != NOT_GIVEN
          warn_with_uplevel 'Passing `repeat` with the 2nd argument of `Markdown.sandwich` is deprecated. Use keyword argument like `Markdown.sandwich(repeat: ...)` instead.', uplevel: 1
          repeat = legacy_repeat
        end

        text_block = []
        text_block << headers
        repeat.times do
          text_block << Faker::Lorem.paragraph(sentence_count: sentences)
          text_block << random
        end
        text_block.join("\n")
      end

      private

      def available_methods
        Markdown.public_methods(false) - Base.methods
      end
    end
  end
end
